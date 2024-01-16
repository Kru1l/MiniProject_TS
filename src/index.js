const usersDiv = document.getElementById('users');
const BASEURL = 'https://jsonplaceholder.typicode.com/users';
fetch(BASEURL)
    .then(value => value.json())
    .then(users => users.forEach(user => {
    const { id, name } = user;
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');
    const pId = document.createElement('p');
    pId.innerText = `ID: ${id}`;
    const pName = document.createElement('p');
    pName.innerText = name;
    const divBtn = document.createElement('div');
    divBtn.classList.add('divBtn');
    const btn = document.createElement('button');
    divBtn.appendChild(btn);
    btn.classList.add('btnInfo');
    btn.innerText = 'More Info';
    btn.onclick = (() => {
        open(`UserDetails/user-details.html?userId=${id}`);
    });
    userDiv.append(pId, pName, divBtn);
    usersDiv.appendChild(userDiv);
}))
    .catch(reason => console.error(reason));
