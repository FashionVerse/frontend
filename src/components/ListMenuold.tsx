import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
type Props = {
  items: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};
const ListMenu = ({ children, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleClick = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    // setAnchorEl(event.currentTarget);
  };

  const handleClose = (href) => {
    {
    }
    setAnchorEl(null);
    if (href) router.push(href);
  };

  return (
    <div>
      <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
        className="drops-btn"
      >
        {children}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        className="custom-dropdown-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          style: {
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(2px)",
            borderRadius: "10px",
            border: "1px solid #fff",
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
            style={{
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
              className="hover:tw-backdrop-blur-md tw-rounded-xl"
              style={{
                color: "#fff",
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              {item.label}
            </MenuItem>
          </motion.div>
        ))}
      </Menu>
    </div>
  );
};

export default ListMenu;
