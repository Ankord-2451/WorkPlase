import React, { Component } from 'react';

export class Authorization extends Component {
    static displayName = Authorization.name;

  render() {
      return (   
              <div class="login">
                  <div class="text-center">
                      <form method="post">
                          <label name="Login">Login :</label>
                          <input type="text" name="login" />
                          <br />
                          <label name="Password">Password :</label>
                          <input type="password" name="password" />
                          <br />
                          <button type="submit">Log in</button>
                      </form>
                      <br />
                      <button>Create Account</button>
                  </div>
              </div>
    );
  }
}
