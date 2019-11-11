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

function SkillBoxComponent(props) {
  let capitalizedSkill = capFirst(props.skillName);
  return (
      <div id={props.skillName} className="skill_box">
        <div className="left">{capitalizedSkill}</div>
        <div className="right"><SkillIcon skillName={props.skillName} /></div>
        <div className="left">Current Level:</div>
        <div className="right current_level">{props.currentLevel || "-"}</div>
        <div className="left">Target Level:</div>
        <div className="right">99</div>
        <div className="left">Days to Max:</div>
        <div className="right days_to_max">-</div>
      </div>
  );
}

interface AppContainerProps = {

};

function AppContainer(props) {
  return (
      <div className="wrapper">
        <SkillBoxComponent skillName="woodcutting" />
        <div className="main">
          <div className="title_row">
            <img src={require("./assets/daily_scape.png")}/>
          </div>
          <div>RSN:</div>
          <div className="right">
            <input id="player-name-input"/>
            <button type="button" className="btn btn-default" id="go-btn">Go</button>
          </div>
          <div>Days to Max:</div>
          <div className="right days_to_max">-</div>
          <div></div>
          <div className="right"><a href="https://github.com/XIIFulminata/Daily-Capes" target="_blank"><img
              src={require("./assets/quest.png")}/></a></div>
        </div>
        <SkillBoxComponent skillName="fishing" />
        <SkillBoxComponent skillName="farming" />
        <SkillBoxComponent skillName="divination" />
        <SkillBoxComponent skillName="slayer" />
        <SkillBoxComponent skillName="herblore" />
        <SkillBoxComponent skillName="agility" />
        <SkillBoxComponent skillName="dungeoneering" />
      </div>
  );

}
