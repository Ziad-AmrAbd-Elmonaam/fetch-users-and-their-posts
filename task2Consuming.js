getUsersData().then(usersData => {
    drawingFirstTable(usersData)
    drawingSecondTable(usersData, 'username', 'email', 'company', 'address', 'posts')
});

