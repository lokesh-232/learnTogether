document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch groups from the server
    function fetchGroups() {
        fetch('groups.php')
            .then(response => response.json())
            .then(data => {
                // Create group rows
                createGroupRows(data);
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
            });
    }

    // Function to create group rows
    async function createGroupRows(groups) {
        const groupsContainer = document.getElementById("groupsContainer");
        if (!groupsContainer) {
            console.error("groupsContainer element not found");
            return;
        }

        // Clear previous content
        groupsContainer.innerHTML = '';

        // Create rows for each domain
        const domains = {};
        groups.forEach(group => {
            if (!domains[group.domain]) {
                domains[group.domain] = [];
            }
            domains[group.domain].push(group);
        });

        // Iterate over domains and create rows
        for (const domain in domains) {
            if (Object.hasOwnProperty.call(domains, domain)) {
                const domainGroups = domains[domain];
                const domainRow = document.createElement('div');
                domainRow.classList.add('domain-row');
                domainRow.innerHTML = `<h2 class="domain-name">${domain}</h2>`;
                groupsContainer.appendChild(domainRow);
                
                // Create group container within the domain row
                const groupContainer = document.createElement('div');
                groupContainer.classList.add('group-container');
                domainRow.appendChild(groupContainer);

                // Create group boxes within the group container
                const memberCountPromises = domainGroups.map(group => fetchMemberCount(group.groupName));
                try {
                    const memberCounts = await Promise.all(memberCountPromises);
                    domainGroups.forEach((group, index) => {
                        const groupBox = document.createElement("div");
                        groupBox.classList.add("group-box");
                        groupBox.innerHTML = `
                            <h3>${group.groupName}</h3>
                            <p>${group.description}</p>
                            <p>Members: ${memberCounts[index]}</p>
                            <button class="join-btn" data-group-name="${group.groupName}">Join</button>
                        `;
                        groupBox.querySelector(".join-btn").addEventListener("click", async function() {
                            const groupName = this.getAttribute("data-group-name");
                            console.log('isLoggedIn:', isLoggedIn());
                            if (isLoggedIn() === 'true') {
                                const username = getUserDetailsFromURL();
                                try {
                                    const response = await fetch('new_user.php?groupName=' + encodeURIComponent(groupName) + '&username=' + encodeURIComponent(username));
                                    if (!response.ok) {
                                        throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
                                    }
                                    const data = await response.json();
                                    console.log(data);
                                    // Refresh the groups after user is added to the group
                                    var name=getUserDetailsFromURL();
                                    const url = `join.html?groupName=${encodeURIComponent(groupName)}&username=${encodeURIComponent(name)}`;
                                    window.location.href = url; 
                                    fetchGroups();
                            
                                } catch (error) {
                                    console.error('Error adding user to group:', error);
                                }
                            } else {
                                // Redirect user to the login page
                                window.location.href = "http://localhost:8080/studygroup/group/login.html";
                            }
                        });
                        groupContainer.appendChild(groupBox);
                    });
                } catch (error) {
                    console.error('Error fetching member counts:', error);
                }
            }
        }
    }

    // Function to check if the user is logged in
    function isLoggedIn() {
        var s = localStorage.getItem('success');
        console.log(s);
        return s;
    }

    function getUserDetailsFromURL() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const userDetails = {
            success: urlParams.get('success'),
            username: urlParams.get('username'),
            email: urlParams.get('email')
        };
        var name = userDetails.username;
        return name;
    }

    // Function to fetch the number of members for a given group
    async function fetchMemberCount(groupName) {
        var name = getUserDetailsFromURL();
        const url = `user_group.php?groupName=${encodeURIComponent(groupName)}&username=${encodeURIComponent(name)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
            }
            const data = await response.json();
            return data.memberCount;
        } catch (error) {
            console.error(`Error fetching member count from ${url}:`, error);
            return 0; // Return 0 if there's an error
        }
    }

    // Fetch groups when the DOM content is loaded
    fetchGroups();
});
