import { create } from "zustand";

const projectStore = create((set)=>({
    projects : [],
    addProject:(project)=>set((state)=>({
        projects:[...state.projects,project]
    })),
    setProjects:(projects)=>set(()=>({
        projects
    }))
}))

export default projectStore;