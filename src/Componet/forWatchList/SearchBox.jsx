import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Tooltip from "@mui/material/Tooltip";

function SearchBox() {
  return (
    <>
      <div className="searchInputField" style={{margin: '10px 0 '}}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              background: "rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Tooltip title="Search">
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <InputBase
              sx={{ ml: 1, flex: 1, color: "white" }}
              placeholder="Search Stock like RELIENCE, SBIN"
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </div>
    </>
  )
}

export default SearchBox
