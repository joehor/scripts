// dado um json de objetos
data = [
    {id: 1, nome: 'MARCELO', cidade: 'SAO PAULO'},
    {id: 2, nome: 'PAULO', cidade: 'PORTO ALEGRE'},
    {id: 3, nome: 'JOAO', cidade: 'SAO LEOPOLDO'},
    {id: 4, nome: 'RODRIGO', cidade: 'SALVADOR'},
    {id: 5, nome: 'MARCOS', cidade: 'RIO DE JANEIRO'}
];

// se necessário injeta uma coluna check para marcar
datacolumns = addCheckField(data);

// pega as colunas
datacolumns = Object.keys(data); // [id, nome, cidade]

// injeta como objeto 
columns = addColumns(datacolumns); // {id: 1, name: 'id', caption: 'Id', type: 'numeric', sort: 0, visible: true}

function addColumns(cols) {

    columns = cols.map((col, i) => {
      cap = col.substr(0, 1).toUpperCase() + col.substr(1).toLocaleLowerCase();
      vis = col.substr(0, 1) !== '_'; // torna invisivel os campos que iniciam com underline ...
      column = {id: i, name: col, caption: cap, type: typeof(this.dataset[0][col]), sort: 0, visible: vis};
      return column;
    });

    // console.log('columns: ' + JSON.stringify(columns));

    // adiciona a opção todos
    columns.unshift({id: -1, name: '', caption: '-- Todos --', type: 'string', sort: 0, visible: false});
    //  | filter : 'true' : 'visible'

    // console.log('columns: ' + JSON.stringify(columns));

    return columns;

  }

  function addCheckField(dataset) {

    return dataset.map(data => {
      return {...data, check: false};
    });

  }

function ordenar(dataset, campo, sort) {
    const nsort = ((sort == 0) ? 1 : ((sort == 1) ? -1 : 1));
    const isAsc = sort === 1;

    // marca a coluna ordenada se ouver...
    if (Object.keys(dataset).filter(c => c === 'sort').length > 0)
    this.columns.map(col => {
      if (col.name == campo) { col.sort = nsort; } else { col.sort = 0; }
    });

    dataset.sort((a, b) => {
     return this.compare(a[campo].toString().toLocaleLowerCase(), b[campo].toString().toLocaleLowerCase(), isAsc);
    });
}

function compare(a, b, isAsc) {

    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);

}
