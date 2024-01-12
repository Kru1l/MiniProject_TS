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
        pId.innerText = `ID: ${id}`;
        const pName: HTMLParagraphElement = document.createElement('p');
        pName.innerText = `Name: ${name}`;

        const btn: HTMLButtonElement = document.createElement('button');
        btn.classList.add('btnInfo');
        btn.innerText = 'More Info';
        btn.onclick = ((): void => {
            open(`UserDetails/user-details.html?userId=${id}`);
        })
        userDiv.append(pId, pName, btn);
        usersDiv.appendChild(userDiv);
    }))
    .catch(reason => console.error(reason));
