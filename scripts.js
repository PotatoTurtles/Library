console.log("hello world");

//form inputs
let bookHolder = document.querySelector('.bookHolder');
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let pages = document.querySelector('#pages');
let slideOut = document.querySelector(".outSlide");
let colSelect = document.querySelector('#colSelect');
let createBook = document.querySelector('#createBook');

let form = document.querySelector('form');
form.addEventListener('submit',(e)=>e.preventDefault())

console.log(title, author, pages);

let testTitle = document.querySelector('.title.test');
let testAuthor = document.querySelector('.author.test');
let testPages = document.querySelector('.pgCount.test');
let testbookCover = document.querySelector('.bookCover.test');

testTitle.textContent="Great Expectations";
testAuthor.textContent="Written By: Charles Dickens";
testPages.textContent=`Pages: 483`;
slideOut.textContent=pages.value;
testbookCover.style.background=colSelect.value;



pages.addEventListener('mousemove', ()=>slideOut.textContent=pages.value);
pages.addEventListener('mousemove', ()=>testPages.textContent=`Pages: ${pages.value}`);
title.addEventListener('keyup', ()=>testTitle.textContent=title.value);
author.addEventListener('keyup', ()=>testAuthor.textContent=`Written By: ${author.value}`);
colSelect.addEventListener('input', ()=>testbookCover.style.background=colSelect.value);
createBook.addEventListener('click',()=>addBook())

let bookId = [];

let bookIndex = [];

function Book(id,bookTitle=title.value,bookAuthor=author.value,bookPages=pages.value,bookColor=colSelect.value,read=false){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id=id;
    this.bookTitle=bookTitle;
    this.bookAuthor=bookAuthor;
    this.bookPages=bookPages;
    this.bookColor=bookColor;
    this.read=read;

    this.changeStatus = function(){
        this.read=!this.read;
    }
}

function rmIdVal(val){
    for(let i=0; i<bookId.length; i++){
        if(bookId[i]==val){
            bookId.splice(i,1);
        }
    }
}
function addIdVal(){
    let tempId = Math.floor(Math.random()*10000);
    while(bookId.includes(tempId)){
        tempId = Math.floor(Math.random()*10000);
    }
    return `${tempId}`
}

function addBook(bookTitle=title.value,bookAuthor=author.value,bookPages=pages.value,bookColor=colSelect.value){
    // add book to DOM
    if(form.checkValidity()){
        let id = addIdVal();

        let bookUnit = document.createElement("div");
        bookUnit.classList.add(`${id}`);
        bookUnit.classList.add('bookContainer');
        console.log(bookUnit.classList);

        let bookCover = document.createElement("div");
        bookCover.classList.add('bookCover');
        bookCover.style.background=bookColor;
        bookUnit.appendChild(bookCover);

        let titled = document.createElement('p');
        titled.classList.add('title');
        titled.textContent=bookTitle;
        bookUnit.appendChild(titled);

        let authored = document.createElement('p');
        authored.classList.add('author');
        authored.textContent=`Written By: ${bookAuthor}`;
        bookUnit.appendChild(authored);

        let paged = document.createElement('p');
        paged.classList.add('pgCount');
        paged.textContent=`Pages: ${bookPages}`;
        bookUnit.appendChild(paged);

        let outerDelete = document.createElement('div');
        outerDelete.classList.add('outDlt');
            let dltButton = document.createElement('button');
            dltButton.classList.add(`${id}`);
            dltButton.textContent='-';
            dltButton.addEventListener('click',()=>rmBook(dltButton));
            outerDelete.appendChild(dltButton);
        bookUnit.appendChild(outerDelete);

        let outerRead = document.createElement('div');
        outerRead.classList.add('outRead');
            let readButton = document.createElement('button');
            readButton.classList.add(`${id}`);
            readButton.textContent='Read';
            bookIndex[bookIndex.length]=new Book(id);
            readButton.addEventListener('click',()=>swapStatus(+readButton.classList[0]));
            outerRead.appendChild(readButton);
        bookUnit.appendChild(outerRead);

        bookHolder.appendChild(bookUnit);

        //erase form values
        slideOut.textContent=483;
        pages.value=483;

        testPages.textContent=`Pages: 483`;

        testTitle.textContent="Great Expectations";
        title.value="";

        testAuthor.textContent=`Written By: Charles Dickens`;
        author.value="";

        testbookCover.style.background='black';
        colSelect.value='black';
    }
}

function rmBook(element){
    let classId = element.classList[0];
    console.log(classId);
    let bookDiv = document.querySelector(`.${CSS.escape(classId)}.bookContainer`);
    bookDiv.remove();
    rmIdVal(classId);
}

function swapStatus(idNum){
    for(let i=0; i<bookIndex.length;i++){
        if(bookIndex[i].id==idNum){
            bookIndex[i].changeStatus();
            console.log(bookIndex[i].read);
        }
    }
}