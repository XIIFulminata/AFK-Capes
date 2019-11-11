import React from 'react';
import logo from './logo.svg';
import './App.css';

function capFirst (lower) {
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function SkillIcon(props) {
  switch (props.skillName) {
    case "woodcutting": return <img src={require("./assets/small-skill-icons/Woodcutting-icon.png")} alt=""/>;
    case "fishing": return <img src={require("./assets/small-skill-icons/Fishing-icon.png")} alt=""/>;
    case "farming": return <img src={require("./assets/small-skill-icons/Farming-icon.png")} alt=""/>;
    case "divination": return <img src={require("./assets/small-skill-icons/Divination-icon.png")} alt=""/>;
    case "slayer": return <img src={require("./assets/small-skill-icons/Slayer-icon.png")} alt=""/>;
    case "herblore": return <img src={require("./assets/small-skill-icons/Herblore-icon.png")} alt=""/>;
    case "agility": return <img src={require("./assets/small-skill-icons/Agility-icon.png")} alt=""/>;
    case "dungeoneering": return <img src={require("./assets/small-skill-icons/Dungeoneering-icon.png")} alt=""/>;
    default: return <img src={require("./assets/small-skill-icons/Woodcutting-icon.png")} alt=""/>;
  }
}

const EXP_AT_99 = 13034431;
const EXP_AT_120 = 104273167;

const calcDaysToMax = (currentExp, targetLvlExp) => {
    // placeholder for giant switch statement to helpers
    return (
        currentExp < targetLvlExp
            ? parseInt((targetLvlExp - currentExp)/50000)
            : 0
    );
};

function SkillBoxComponent(props) {
  let capitalizedSkill = capFirst(props.skillName);
  const daysToMax = props.currentExp ? calcDaysToMax(props.currentExp, EXP_AT_99) : "-";
  if (daysToMax !== "-") {
      // console.log(daysToMax);
      // happening too early => do something fun with the state
      props.sendUpMaxDays(daysToMax); // should be a handler or something
  }
  return (
      <div id={props.skillName} className="skill_box">
        <div className="left">{capitalizedSkill}</div>
        <div className="right"><SkillIcon skillName={props.skillName} /></div>
        <div className="left">Current Level:</div>
        <div className="right current_level">{props.currentLevel || "-"}</div>
        <div className="left">Target Level:</div>
        <div className="right">99</div>
        <div className="left">Days to Max:</div>
        <div className="right days_to_max">{daysToMax}</div>
      </div>
  );
}

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: "",
            rawPlayerData: [],
            // woodcuttingLvl: 1,
            // woodcuttingExp: 0,
        };
    }

    handleNameSubmit = () => {
        // alert("test");
        // make the api call
        // log the results
        this.getPlayerData(this.state.playerName)
    };
    handleNameInputChange = (event) => {
        event.preventDefault();
        // console.log(event.target.value);
        this.setState({playerName: event.target.value});
    };

    rawDataRowHelper = (row) => {
        return (
        this.state.rawPlayerData[row]
            ? this.state.rawPlayerData[row].split(",")
            : null);
    };

    rawDataRowToLvl = (row) => {
        return (
            this.rawDataRowHelper(row)
                ? this.rawDataRowHelper(row)[1]
                : 1);
    };

    rawDataRowToExp = (row) => {
        return (
            this.rawDataRowHelper(row)
                ? this.rawDataRowHelper(row)[2]
                : 1);
    };

    updateLevels = () => {
        // alert("hi");
        // consider setstate callback

        // console.log(this.state.rawPlayerData[9]);
        this.setState({
            woodcuttingLvl: this.rawDataRowToLvl(9), // write xp to LVL at some point
            woodcuttingExp: this.rawDataRowToExp(9),
            fishingLvl: this.rawDataRowToLvl(11),
            fishingExp: this.rawDataRowToExp(11),
            herbloreLvl: this.rawDataRowToLvl(16),
            herbloreExp: this.rawDataRowToExp(16),
            agilityLvl: this.rawDataRowToLvl(17),
            agilityExp: this.rawDataRowToExp(17),
            slayerLvl: this.rawDataRowToLvl(19),
            slayerExp: this.rawDataRowToExp(19),
            farmingLvl: this.rawDataRowToLvl(20),
            farmingExp: this.rawDataRowToExp(20),
            dungeoneeringLvl: this.rawDataRowToLvl(25),
            dungeoneeringExp: this.rawDataRowToExp(25),
            divinationLvl: this.rawDataRowToLvl(26),
            divinationExp: this.rawDataRowToExp(26),
        });
    };

    getPlayerData = (playerName) => {
        const Http = new XMLHttpRequest();
        // temporarily using heroku app as a proxy
        const url='https://cors-anywhere.herokuapp.com/http://services.runescape.com/m=hiscore/index_lite.ws?player='+playerName;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            if (Http.responseText) {
            // Might have to do with how the proxy is set up, but this actually gets called 3 times, the first
            // of which is invalid, and the last 2 are the same
            // this ignores the first call
                this.setState(
                    {rawPlayerData: Http.responseText.split('\n')},
                    () => {this.updateLevels();}
                );
            }


            // console.log(this.state.rawPlayerData);
            // console.log(typeof this.state.rawPlayerData);
        }
    };

    sendUpMaxDays = (days) => {
        // console.log("in sendUpMaxDays");
        // if (!this.state.maxDays || (days > this.state.maxDays)) {
        //     this.setState({maxDays: days}, () => {console.log("MAX DAYS: "+this.state.maxDays)});
        // }
    };

    commonProps = {
      sendUpMaxDays: this.sendUpMaxDays,
    };

    handleNameInputSubmit = (event) => {
        // console.log(event.keyCode);
        if (event.keyCode && event.keyCode === 13) {
            this.handleNameSubmit();
        }
    };

    render () {
      //  TODO Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state...
      return (
          <div className="wrapper">
              <SkillBoxComponent {...this.commonProps} skillName="woodcutting" currentLevel={this.state.woodcuttingLvl} currentExp={this.state.woodcuttingExp} />
              <div className="main">
                  <div className="title_row">
                      <img src={require("./assets/daily_scape.png")}/>
                  </div>
                  <div>RSN:</div>
                  <div className="right should-be-a-form">
                      <input id="player-name-input" onChange={this.handleNameInputChange} onKeyDown={this.handleNameInputSubmit}/>
                      {/* TODO make form and figure out why default value breaks this*/}
                      <button type="submit" className="btn btn-default" id="go-btn" onClick={this.handleNameSubmit}>Go</button>
                  </div>
                  <div>Days to Max:</div>
                  <div className="right days_to_max">{this.state.maxDays || "-"}</div>
                  <div></div>
                  <div className="right"><a href="https://github.com/XIIFulminata/Daily-Capes" target="_blank"><img
                      src={require("./assets/quest.png")}/></a></div>
              </div>
              <SkillBoxComponent {...this.commonProps} skillName="fishing" currentLevel={this.state.fishingLvl} currentExp={this.state.fishingExp} />
              <SkillBoxComponent {...this.commonProps} skillName="farming" currentLevel={this.state.farmingLvl} currentExp={this.state.farmingExp} />
              <SkillBoxComponent {...this.commonProps} skillName="divination" currentLevel={this.state.divinationLvl} currentExp={this.state.divinationExp} />
              <SkillBoxComponent {...this.commonProps} skillName="slayer" currentLevel={this.state.slayerLvl} currentExp={this.state.slayerExp} />
              <SkillBoxComponent {...this.commonProps} skillName="herblore" currentLevel={this.state.herbloreLvl} currentExp={this.state.herbloreExp} />
              <SkillBoxComponent {...this.commonProps} skillName="agility" currentLevel={this.state.agilityLvl} currentExp={this.state.agilityExp} />
              <SkillBoxComponent {...this.commonProps} skillName="dungeoneering" currentLevel={this.state.dungeoneeringLvl} currentExp={this.state.dungeoneeringExp} />
          </div>
      );
    }
}

function App() {
  return (
    <AppContainer/>
  );
}

export default App;
