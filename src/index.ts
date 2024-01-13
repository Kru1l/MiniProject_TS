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
        pName.innerText = name;

        const divBtn: HTMLDivElement = document.createElement('div');
        divBtn.classList.add('divBtn');
        const btn: HTMLButtonElement = document.createElement('button');
        divBtn.appendChild(btn);
        btn.classList.add('btnInfo');
        btn.innerText = 'More Info';
        btn.onclick = ((): void => {
            open(`UserDetails/user-details.html?userId=${id}`);
        })
        userDiv.append(pId, pName, divBtn);
        usersDiv.appendChild(userDiv);
    }))
    .catch(reason => console.error(reason));