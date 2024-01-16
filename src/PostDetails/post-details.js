const curLoc = new URL(location.href);
const post = curLoc.searchParams.get('post');
const parsePost = JSON.parse(post);
const { userId, id, title, body } = parsePost;
const comPosts = 'https://jsonplaceholder.typicode.com/posts/';
const postDiv = document.body.getElementsByClassName('postInfo')[0];
const h2 = document.createElement('h2');
h2.id = 'h2Post';
h2.innerText = 'Post Details';
const ul = document.createElement('ul');
postDiv.append(h2, ul);
const li1 = document.createElement('li');
li1.innerText = `UserID: ${userId}`;
const li2 = document.createElement('li');
li2.innerText = `ID: ${id}`;
const li3 = document.createElement('li');
li3.innerText = `Title: ${title}`;
const li4 = document.createElement('li');
li4.innerText = `Body: ${body}`;
ul.append(li1, li2, li3, li4);
const commsDiv = document.body.getElementsByClassName('comments')[0];
const h2Comms = document.createElement('h2');
h2Comms.id = 'h2Comms';
h2Comms.innerText = 'Comments';
commsDiv.appendChild(h2Comms);
fetch(`${comPosts}${id}/comments`)
    .then(value => value.json())
    .then(comments => comments.forEach(comment => {
    const { postId, id, name, email, body } = comment;
    const div = document.createElement('div');
    div.classList.add('comm');
    const pPostId = document.createElement('p');
    pPostId.innerText = `PostID: ${postId}`;
    const pId = document.createElement('p');
    pId.innerText = `ID: ${id}`;
    const pName = document.createElement('p');
    pName.innerText = `Name: ${name}`;
    const pEmail = document.createElement('p');
    pEmail.innerText = `Email: ${email}`;
    const pBody = document.createElement('p');
    pBody.innerText = `Body: ${body}`;
    div.append(pPostId, pId, pName, pEmail, pBody);
    commsDiv.appendChild(div);
}))
    .then(() => {
    const childDiv = commsDiv.children[5];
    childDiv.classList.add('lastChild');
})
    .catch(reason => console.error(reason));
