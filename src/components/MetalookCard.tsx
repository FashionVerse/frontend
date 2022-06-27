import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/system";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import storage from "../../firebase/clientApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface MetalookCardProps {
  id: string;
  name: string;
  description: string;
  src: string;
  alt: string;
  quantity: string;
  contract: string;
  account: string;
  metalook: any;
}

export const FashionItemCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: "404px",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 51,121,157 )`
      : alpha(theme.palette.primary.light, 0.4),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
  padding: "16px",
  borderRadius: "6px",
  boxShadow: "none",
}));

const MetalookCardContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  background:
    theme.palette.mode === "dark"
      ? `rgba( 51,121,157 )`
      : alpha(theme.palette.primary.light, 0.4),
  backdropFilter: `blur( 8px )`,
  WebkitBackdropFilter: `blur( 8px )`,
  padding: "16px",
  borderRadius: "16px",
}));

export default function MetalookCard(props: MetalookCardProps) {
  const [file, setFile] = React.useState(null);
  const [percent, setPercent] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit() {
    try {
      if (!file) {
        return;
      }

      if(file.size > 104857600){
        alert("Photo is too big!");
        this.value = "";
     };

      await fetch(process.env.API_URL + "/api/addMetalook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenId: props.id,
          contractAddress: props.contract,
          account: props.account,
        }),
      });

      const storageRef = ref(
        storage,
        `/Metalooks/uploaded/${Date.now().toString()}-${file.name}`
      );

      const uploadTask = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadTask.ref);

      await fetch(process.env.API_URL + "/api/addMetalook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenId: props.id,
          contractAddress: props.contract,
          account: props.account,
          uploadedImage: url,
        }),
      });
      window.location.reload();
    } catch {
      alert("An error has occurred.");
    }
  }

  function handleFilename(file) {
    var file_name = file.name;
    var arr_filename = file_name.split(".");
    var file_ex = arr_filename[arr_filename.length - 1];
    if (file_name.length > 14) {
      file_name = file_name.substr(0, 7) + "..." + file_name.substr(-7);
    }

    return file_name;
  }

  return (
    <MetalookCardContainer>
      <Box
        sx={{
          minWidth: "300px",
          aspectRatio: "1/1",
          position: "relative",
          borderRadius: "1rem",
          backgroundColor: "white",
        }}
      >
        <Image
          src={props.src}
          alt={props.alt}
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {props.name}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          align="center"
          marginBottom={5}
        >
          {props.description}
        </Typography>

<div style={{marginBottom: "10"}}>
        {expanded ?
        <Button variant="outlined" onClick={()=>{setExpanded(false)}} startIcon={<RemoveIcon />}>
          Show Less
        
      </Button> :
        <Button variant="outlined" onClick={()=>{setExpanded(true)}} startIcon={<AddIcon />}>
          Show More
        </Button>
        
}
</div>
<br />

<div>
{expanded ? <div>
        {!props.metalook.metalookImage && !props.metalook.uploadedImage ? (
          <div>
            <Button variant="contained" component="label">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
            </Button>
            <p>Please upload your image here. Max 100MB</p>
            {!file ? <div></div> : <p>{handleFilename(file)}</p>}
          </div>
        ) : (
          <div>
            {props.metalook.metalookImage ? (
              <p style={{ color: "lime" }}>Metalook already created</p>
            ) : (
              <p style={{ color: "LightGrey" }}>Metalook is being processed</p>
            )}
          </div>
        )}

        <br />
        {file ? (
          <Button
            variant="contained"
            component="label"
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ) : (
          <div></div>
        )}
        </div> : <div></div>}
        </div>

      </Box>
    </MetalookCardContainer>
  );
}
