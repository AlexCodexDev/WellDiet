import * as DAO from "./dao.js";

export const FetchServices = async () => {
    const result = await DAO.FetchDAO();
    return result;
}

export const CreateServices = async (data) => {
    const { name, description } = data;

    if(!name) {
        throw new Error("Action name cannot be empty.");
    }

    await DAO.CreateDAO({ name, description });
    return "Action successful created.";
}

export const UpdateServices = async (code, data) => {
    const { name, description, isActive } = data;

    if(!code) {
        throw new Error("Cannot process : code not found.");
    }

    if(!name) {
        throw new Error("Action name cannot be empty.");
    }

    if(!isActive) {
        throw new Error("Status cannot be empty.");
    }

    await DAO.UpdateDAO(code, { name, description, isActive });
    return "Action successful updated.";
}

export const DeleteServices = async (code) => {
    if(!code) {
        throw new Error("Cannot process : code not found.");
    }

    await DAO.DeleteDAO(code);
    return "Action successful deleted.";
}