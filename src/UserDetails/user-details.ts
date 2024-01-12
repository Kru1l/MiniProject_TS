// На сторінці user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для отримання постів використовуйте эндпоінт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Кожному посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
//     котра має детальну інфу про поточний пост.
const BaseURL: string = 'https://jsonplaceholder.typicode.com/users/';
const url: URL = new URL(location.href);
const iD: string = url.searchParams.get('userId');
const main: HTMLElement = document.body.getElementsByTagName('main')[0];
const infoDiv: Element = document.body.getElementsByClassName('info')[0];

const h2Ud = document.createElement('h2');
h2Ud.innerText = 'User Details';

const list: HTMLUListElement = document.createElement('ul');
list.classList.add('list');
infoDiv.append(h2Ud, list);
fetch(BaseURL + iD)
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

const btnPosts: HTMLButtonElement = document.createElement('button');
btnPosts.classList.add('btnPosts');
btnPosts.innerText = 'Show posts of current user';

const postsDiv: HTMLDivElement = document.createElement('div');
postsDiv.classList.add('posts');
main.append(btnPosts, postsDiv);

btnPosts.onclick = ((): void => {
    const h2Posts: HTMLHeadingElement = document.createElement('h2');
    h2Posts.id = 'h2Posts';
    h2Posts.innerText = "Post's Titles";
    postsDiv.appendChild(h2Posts);
    fetch(BaseURL + iD + '/posts')
        .then(value => value.json())
        .then(posts => posts.forEach(post => {
            const div: HTMLDivElement = document.createElement('div');
            div.classList.add('post');
            const p: HTMLParagraphElement = document.createElement('p');
            p.innerText = `"${post.title}"`;

            const btn: HTMLButtonElement = document.createElement('button');
            btn.classList.add('btnPost');
            btn.innerText = 'About the post';
            btn.onclick = ((): void => {
                open(`../PostDetails/post-details.html?post=${JSON.stringify(post)}`);
            })

            div.append(p, btn);
            postsDiv.appendChild(div);
        }))
        .catch(reason => console.error(reason))
    btnPosts.disabled = true;
})
