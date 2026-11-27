import * as DAO from "./dao.js";

export const FetchServices = async () => {
    const result = await DAO.FetchDAO();
    return result;
}

export const CreateServices = async (data) => {
    const { name, category } = data;

    if(!name) {
        throw new Error("Goal name cannot be empty.");
    }

    if(!category) {
        throw new Error("Goal category cannot be empty.");
    }

    const result = await DAO.CreateDAO({name, category});
    return "Goal successful created.";
}

export const UpdateServices = async (code, data) => {
    const { name, category, isActive } = data;

    if(!code) {
        throw new Error("Cannot process : code not found.");
    }

    if(!name) {
        throw new Error("Goal name cannot be empty.");
    }

    if(!category) {
        throw new Error("Goal category cannot be empty.");
    }

    if(!isActive) {
        throw new Error("Status cannot be empty.");
    }

    await DAO.UpdateDAO(code, { name, category, isActive });
    return "Goal successful updated.";
}

export const DeleteServices = async (code) => {
    if(!code) {
        throw new Error("Cannot process : code not found.");
    }

    await DAO.DeleteDAO(code);
    return "Goal successful deleted.";
}