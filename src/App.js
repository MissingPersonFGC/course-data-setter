import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Qs from "qs";

class App extends React.Component {
  state = {
    apiKey: "",
    courses: [],
    selectedCourse: null,
    assignments: []
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  requestCourses = async e => {
    e.preventDefault();
    const { apiKey } = this.state;
    axios({
      method: "GET",
      url: "https://proxy.hackeryou.com",
      //OR url: 'https://proxy.hackeryou.com',
      dataResponse: "jsonp",
      paramsSerializer: function(params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl: "https://canvas.instructure.com/api/v1/courses/",
        params: {
          access_token: apiKey,
          state: "unpublished"
        },
        xmlToJSON: false
      }
    }).then(res => {
      const courses = res.data;
      this.setState({
        courses
      });
    });
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.requestCourses}>
          <fieldset>
            <label htmlFor="apiKey">
              Input your API Key:
              <input
                type="text"
                name="apiKey"
                value={this.state.apiKey}
                onChange={this.changeState}
              />
            </label>
            <input type="submit" value="Get Courses" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default App;
