// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули

const usersDiv = document.getElementById('users');
const BASEURL: string = 'https://jsonplaceholder.typicode.com/users';
fetch(BASEURL)
    .then(value => value.json())
    .then(users => users.forEach(user => {
        const {id, name} = user;
        const userDiv: HTMLDivElement = document.createElement('div');
        userDiv.classList.add('user');

        const pId: HTMLParagraphElement = document.createElement('p');
        pId.innerText = `User ID: ${id}`;
        const pName: HTMLParagraphElement = document.createElement('p');
        pName.innerText = `Name: ${name}`;

        const btn: HTMLButtonElement = document.createElement('button');
        btn.classList.add('btnInfo');
        btn.innerText = 'More Info';
        btn.onclick = (() => {
            open(`UserDetails/user-details.html?userId=${id}`);
        })

        userDiv.append(pId, pName, btn);
        usersDiv.appendChild(userDiv);
    }))
    .catch(reason => console.error(reason));



//
//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5 .
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)
