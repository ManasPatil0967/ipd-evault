// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract user {
    struct User{
        address user;
        string Name;
        string Age;
        string Income;
        string State;
    }
    mapping(address=>User) public users;
    mapping(address=>bool) public authenticated;

    event UserCreated(address user, string Name, string Age, string Income, string State);
    event UserLoggedIn(address user);
    event UserLoggedOut(address user);

    modifier onlyAuthenticated() {
        require(authenticated[msg.sender], "User not authenticated");
        _;
    }

    function createUser(string memory Name, string memory Age, string memory Income, string memory State) public {
        require(!authenticated[msg.sender], "User already authenticated");
        users[msg.sender] = User(msg.sender, Name, Age, Income, State);
        authenticated[msg.sender] = true;
        emit UserCreated(msg.sender, Name, Age, Income, State);
    }

    function login() public onlyAuthenticated {
        require(!authenticated[msg.sender], "User already authenticated");
        authenticated[msg.sender] = true;
        emit UserLoggedIn(msg.sender);
    }

    function logout() public onlyAuthenticated {
        require(authenticated[msg.sender], "User not authenticated");
        authenticated[msg.sender] = false;
        emit UserLoggedOut(msg.sender);
    }

    function getUser(address user) public view returns (string memory Name, string memory Age, string memory Income, string memory State) {
        User memory u = users[user];
        return (u.Name, u.Age, u.Income, u.State);
    }

    function onAuthStateChanged(bool state) public {
        if (state) {
            emit UserLoggedIn(msg.sender);
        } else {
            emit UserLoggedOut(msg.sender);
        }
    }

}
