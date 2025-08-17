import { create } from "zustand";

const projectStore = create((set) => ({
    projects: [],
    addProject: (project) => set((state) => ({
        projects: [...state.projects, project]
    })),
    setProjects: (projects) => set(() => ({
        projects
    })),
    getProjects: async (userId) => {
        try {
            const res = await fetch(`/api/getProjects?userId=${userId}`);
            if (res.ok) {
                const data = await res.json();
                set({ projects: data.projects || [] });
            } else {
                console.error("Failed to fetch projects");
            }
        } catch (err) {
            console.error("Error fetching projects:", err)
        }
    }
}))

export default projectStore;