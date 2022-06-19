async function getUsersData() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        return await response.json();
    } catch (err) {
        console.log("Error Ocurred in fetching users", err);
    }
}

async function getPostsData() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        return await response.json();
    } catch (err) {
        console.log("Error Ocurred in fetching posts", err);
    }
}

async function getUserPosts(userId) {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let posts = await response.json();
        return posts.filter(post => post.userId == userId)
    } catch (err) {
        console.log("Error Ocurred in fetching Posts", err);
    }
}

async function getCommentsCounter(postId) {
    try {
        let count = 0;
        let response = await fetch("https://jsonplaceholder.typicode.com/comments");
        let comments = await response.json();
        comments.forEach(comment => {
            if (comment.postId == postId)
                count++
        })
        return count;

    } catch (err) {
        console.log("Error Ocurred in fetching Comments", err);
    }
}

function drawingFirstTable(usersData) {
    //create table
    let usersTable = document.createElement("table");
    document.body.append(usersTable);

    //create row
    let userRow = document.createElement("tr");
    usersTable.append(userRow);

    //add table header
    for (let item in usersData[0]) {
        let tableHeaderCell = createTableHeaderCell(item);
        userRow.append(tableHeaderCell);
    }

    //add table data
    usersData.forEach((element) => {
        userRow = document.createElement("tr");
        usersTable.append(userRow);
        for (let item in element) {
            let tableCell
            if (typeof (element[item]) == 'object') {
                tableCell = createTableCell(Object.values(element[item]).join(','));
            }
            else {
                tableCell = createTableCell(element[item]);
            }
            userRow.append(tableCell);
        }
    });
}

function drawingSecondTable(usersData, ...contentsToShow) {
    //create table
    let usersTable = document.createElement("table");
    document.body.append(usersTable);

    //create row
    let userRow = document.createElement("tr");
    usersTable.append(userRow);

    //add table header
    for (let item of contentsToShow) {
        if (contentsToShow.includes(item)) {
            let tableHeaderCell = createTableHeaderCell(item);
            userRow.append(tableHeaderCell);
        }
    }

    //add table data
    usersData.forEach((user) => {
        userRow = document.createElement("tr");
        usersTable.append(userRow);
        let tableCell;
        for (let item of contentsToShow) {
            if (item == "company") {
                tableCell = createTableCell(user[item]["name"]);

            } else if (item == "address") {
                let geoLocation = user[item]["geo"];
                geoLocation = Object.entries(geoLocation).join(",");
                tableCell = createTableCell(geoLocation);
            }
            else if (item == "posts") {
                let postsUl = document.createElement('ul');
                tableCell = document.createElement('td')
                getUserPosts(user.id).then((posts) => {
                    for (let post of posts) {
                        getCommentsCounter(post.id).then(commentsCount => {
                            let postLi = document.createElement('li');
                            postLi.innerText = `${post.title} 
                            Number of its comments: ${commentsCount}`
                            postsUl.append(postLi)
                        })
                    }
                    tableCell.append(postsUl)
                })
            }
            else {
                tableCell = createTableCell(user[item]);
            }
            userRow.append(tableCell);
        }
    });
}

function createTableCell(valueToShow) {
    let tableCell = document.createElement("td");
    tableCell.innerText = valueToShow;
    return tableCell;
}

function createTableHeaderCell(valueToShow) {
    let tableCell = document.createElement("th");
    tableCell.innerText = valueToShow;
    return tableCell;
}
