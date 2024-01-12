//     На сторінці post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижче інформації про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/посилиння розташувати під інформацією про user.
//     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5 .
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)

const curLoc: URL = new URL(location.href);
const post: string = curLoc.searchParams.get('post');
const parsePost = JSON.parse(post);
const {userId, id, title, body} = parsePost;
const comPosts: string = 'https://jsonplaceholder.typicode.com/posts/';

const postDiv: Element = document.body.getElementsByClassName('postInfo')[0];
const h2: HTMLHeadingElement = document.createElement('h2');
h2.id = 'h2Post';
h2.innerText = 'Post Details';

const ul: HTMLUListElement = document.createElement('ul');
postDiv.append(h2, ul);

const li1: HTMLLIElement = document.createElement('li');
li1.innerText = `UserID: ${userId}`;
const li2: HTMLLIElement = document.createElement('li');
li2.innerText = `ID: ${id}`;
const li3: HTMLLIElement = document.createElement('li');
li3.innerText = `Title: ${title}`;
const li4: HTMLLIElement = document.createElement('li');
li4.innerText = `Body: ${body}`;
ul.append(li1, li2, li3, li4);

const commsDiv = document.body.getElementsByClassName('comments')[0];

const h2Comms: HTMLHeadingElement = document.createElement('h2');
h2Comms.id = 'h2Comms';
h2Comms.innerText = 'Comments';
commsDiv.appendChild(h2Comms);

fetch(`${comPosts}${id}/comments`)
    .then(value => value.json())
    .then(comments => comments.forEach(comment => {
        const {id, name, email, body} = comment;
        const div: HTMLDivElement = document.createElement('div');
        div.classList.add('comm');

        const pId: HTMLParagraphElement = document.createElement('p');
        pId.innerText = id;

        const pName: HTMLParagraphElement = document.createElement('p');
        pName.innerText = name;

        const pEmail: HTMLParagraphElement = document.createElement('p');
        pEmail.innerText = email;

        const pBody: HTMLParagraphElement = document.createElement('p');
        pBody.innerText = body;

        div.append(pId, pName, pEmail, pBody);
        commsDiv.appendChild(div);
    }))
    .catch(reason => console.error());