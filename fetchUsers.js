const API_URL = "https://jsonplaceholder.typicode.com/users";

document.addEventListener("DOMContentLoaded", function () {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => {
            const storedUsers = JSON.parse(sessionStorage.getItem('users')) || [];
            const allUsers = [...users, ...storedUsers]; // Merge API and local users

            const userList = document.getElementById('user-list');
            userList.innerHTML = '';

            if (allUsers.length === 0) {
                userList.innerHTML = "<li>No users found. Please add a new user.</li>";
            } else {
                allUsers.forEach(user => {
                    const li = document.createElement('li');

                    // 用户名
                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = user.name;

                    // View Details 按钮
                    const viewBtn = document.createElement('button');
                    viewBtn.textContent = "View Details";
                    viewBtn.onclick = () => {
                        window.location.href = `details.html?id=${user.id}`;
                    };

                    // Edit 按钮
                    const editBtn = document.createElement('button');
                    editBtn.textContent = "Edit";
                    editBtn.onclick = () => {
                        window.location.href = `edit.html?id=${user.id}`;
                    };

                    // Delete 按钮
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = "Delete";
                    deleteBtn.onclick = () => {
                        if (confirm("Are you sure you want to delete this user?")) {
                            // 删除本地用户（sessionStorage）而非 API 中的（因为 API 是只读的）
                            const updatedUsers = storedUsers.filter(u => u.id !== user.id);
                            sessionStorage.setItem('users', JSON.stringify(updatedUsers));
                            alert("User deleted.");
                            li.remove();
                        }
                    };

                    // 添加元素到 li
                    li.appendChild(nameSpan);
                    li.appendChild(viewBtn);
                    li.appendChild(editBtn);
                    li.appendChild(deleteBtn);
                    userList.appendChild(li);
                });
            }
        })
        .catch(error => console.error("Error fetching users:", error));
});
