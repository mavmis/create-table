function Setbutton(){ // создание формы для ввода строк и стобцов
    // let TableElement = document.querySelector('button.AddTableRowsCols');

    let sectn = document.createElement('section'); // создание елемента (не вставлен) section
    sectn.id = "SetRowCol"; // установка id для section
    sectn.innerHTML = `
    <form action="" method="get" class="form_SetRowCols">
        <div>
            <label for="Row">Строки: </label>
            <input type="number" min="1" name="Row" id="Row" required />
        </div>
        <div>
            <label for="Col">Столбцы: </label>
            <input type="number" min="1" name="Col" id="Cols" required />
        </div>
        <div>
            <input type="submit" value="Создать" onclick="generateTable();"/>
        </div>
    </form>
    `; // изменение содержимого html
    TableRowsCols.after(sectn); // вставка setion после(after) id TableRowsCols (TableRowsCols - это 'базовое' id в index)
}

function default_event(event) {
    event.preventDefault(); // установка события default (отмена действий браузера по умолчанию)
}

function generateTable(){ // чтение данных из формы
    const form = document.querySelector('form.form_SetRowCols'); // выбор формы для последующего чтения из него данных
    form.addEventListener('submit', default_event); // установка события для submit

    const TableCol = form.querySelector('[name="Col"]'), TableRow = form.querySelector('[name="Row"]'); // чтение данных из формы
    const data = {
        row: TableRow.value,
        col: TableCol.value
    }; // создание object с row и col

    createTable(data); // вызов функции createTable
}

function createTable(data){ // создание исходной таблицы от данных data
    let table_section = document.createElement('section'); //создание блока где будет лежать table
    table_section.id = "table_section"; // установка id 

    let table = document.createElement('table'); // создание table
    table.id = 'table'; // установка id

    table_section.append(table); // вставка таблицы в блок section
    SetRowCol.after(table_section); // вставка table_section после секции SetRowCol
    
    for(let i = 0; i < data.row; i++){ // создание таблицы от исходных данных
        createRow(data);
        data.row--;
    }

    GenerateButtons(data); // Вызов функции GenerateButtons
}

function GenerateButtons(data){ // создание buttons для добавления строк и столбцов в table

    let GenerateButtons = document.createElement("div"); // создание блока div
    GenerateButtons.id = "GenBut"
    GenerateButtons.innerHTML = `
    <input type="submit" id ="createRow" value="Добавить строку"/>
    <input type="submit" id ="createCol" value="Добавить столбец"/>
    `; // изменение содержимого html внутри div

    table_section.append(GenerateButtons); // вставка div после table_section (id)

    let row = document.querySelector("#createRow"); // выбор по id createRow
    row.onclick  = createRow.bind(row, data); // установка вызова функции при нажатии

    let col = document.querySelector("#createCol"); // выбор по id createCol
    col.onclick  = createCol.bind(col, data); // установка вызова функции при нажатии
}

function createRow(data){ // добавление строки
    let table = document.querySelector('#table');
    let tr = document.createElement('tr');
    let td;

    for (let i = 0; i < data.col; i++) {
        td = document.createElement('td');
        td.innerHTML = `<input type="text" class="table_text">`;
        tr.append(td);
    }
    data.row ++;

    table.append(tr);
}

function createCol(data){ // добавление столбца
    let trs = document.querySelectorAll('#table tr');
    let td;

    for (let tr of trs) {
	    td = document.createElement('td');
        td.innerHTML = `<input type="text" class="table_text">`;
	    tr.append(td);
    }
    data.col ++;
}
