// На сторінці user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для отримання постів використовуйте эндпоінт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Кожному посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
//     котра має детальну інфу про поточний пост.
const url = new URL(location.href);
const userId: string = url.searchParams.get('userId');
const infoDiv: Element = document.body.getElementsByClassName('info')[0];
const list: HTMLUListElement = document.createElement('ul');
infoDiv.appendChild(list);
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(value => value.json())
    .then(user => {
        const tidyUser: string[] = JSON.stringify(user)
            .replace(/[{}"]/g, '')
            .replace(/:/g, ': ')
            .split(',');

        for (const item of tidyUser) {
            const li: HTMLLIElement = document.createElement('li');
            li.innerText = item.charAt(0).toUpperCase() + item.slice(1) + ';';
            list.appendChild(li);
        }
    })