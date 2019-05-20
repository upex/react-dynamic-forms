import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ChevronDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tooltip from '@material-ui/core/Tooltip';
import './Menu.css'

class Menu extends Component {
  render() {
    const menuItems = this.props.menus.map((menu) => {
      return <Tooltip key={menu.primaryText} title={menu.primaryText} placement="right">
          <ListItem button activeClassName="active" exact component={NavLink} to={menu.path}>
          <ListItemIcon>
          {menu.icon}
          </ListItemIcon>
          <ListItemText primary={menu.primaryText} />
          {/* <ChevronDownIcon /> */}
        </ListItem>
        </Tooltip>
    })
    return(
      <List>
        {menuItems}
      </List>
    )
  }
}

export default Menu;

