import * as React from "react";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {motion} from "framer-motion";
type Props = {
  items: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};

const ListMenu: React.FC<Props> = ({ children, ...props }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (href) => {
    setAnchorEl(null);
    if (href) router.push(href);
  };

  return (
    <>
      <div
        aria-controls={open ? "list-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onMouseOver={handleClick}
      >
        {children}
      </div>
      <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{ onMouseLeave: handleClose }}
      PaperProps={{  
        style: {  
          backgroundColor: "rgba(0,0,0,0.05)",  
          backdropFilter: "blur(5px)",
          borderRadius: "15px",
        },  
      }} 
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {props.items.map((item, i) => (
         <motion.div
         // className="drops_hover_cursor"
         style = {{
           cursor: "pointer",
         }}
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ ease: "easeOut", delay: 0.1 }}
         whileHover={{ scale: 1.035 }}
         whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
       >
        <MenuItem
          onClick={() => handleClose(item.href)}
          key={item.id}
          className="hover:tw-text-slate-100 hover:tw-bg-slate-500 tw-rounded-xl"
        >
          {item.label}
        </MenuItem>
        </motion.div>
      ))}
    </Menu>
    </>
  );
};

export default ListMenu;
