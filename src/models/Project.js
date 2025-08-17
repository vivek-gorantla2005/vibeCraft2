import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, 
    },
    username: {
      type: String,
      default: null,
    },
    projectname: {
      type: String,
      required: true,
    },
    projectdescription: {
      type: String,
    },
  },
  { timestamps: true } 
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
