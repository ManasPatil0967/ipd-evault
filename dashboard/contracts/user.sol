// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract User {
    struct UserInfo {
        string Name;
        string Age;
        string Income;
        string State;
    }
    mapping(address => UserInfo) public users;
    mapping(address => bool) public authenticated;

    event UserCreated(address indexed user, string Name);
    event UserLoggedIn(address indexed user);
    event UserLoggedOut(address indexed user);
    event UserDetailsUpdated(address indexed user, string Name);

    modifier onlyAuthenticated() {
        require(authenticated[msg.sender], "User not authenticated");
        _;
    }

    function createUser(string memory Name, string memory Age, string memory Income, string memory State) public {
        require(!authenticated[msg.sender], "User already authenticated");
        users[msg.sender] = UserInfo(Name, Age, Income, State);
        authenticated[msg.sender] = true;
        emit UserCreated(msg.sender, Name);
    }
    
    function logout() public onlyAuthenticated {
        authenticated[msg.sender] = false;
        emit UserLoggedOut(msg.sender);
    }

    function editUser(string memory Name, string memory Age, string memory Income, string memory State) public onlyAuthenticated {
        users[msg.sender] = UserInfo(Name, Age, Income, State);
        emit UserDetailsUpdated(msg.sender, Name);
    }

    function getUser(address _user) public view returns (string memory Name, string memory Age, string memory Income, string memory State) {
        UserInfo memory u = users[_user];
        return (u.Name, u.Age, u.Income, u.State);
    }

    function isAuth(address _user) public view returns (bool) {
        return authenticated[_user];
    }
}
