import * as DAO from "./dao.js";

export const FetchServices = async () => {
    const data = await DAO.FetchDAO();
    return data;
}

export const CreateServices = async (data) => {
    const { name, description, question } = data;

    if(!name) {
        throw new Error("Fact name cannot be empty.");
    }

    if(!question) {
        throw new Error("Question cannot be empty.");
    }

    await DAO.CreateDAO({
        name,
        description,
        question
    });

    return "Fact successful created."
}

export const UpdateServices = async (code, data) => {
    const { name, description, questionText, isActive } = data;

    if(!name) {
        throw new Error("Fact name cannot be empty.");
    }

    if(!questionText) {
        throw new Error("Question cannot be empty.");
    }

    if(!isActive) {
        throw new Error("Status cannot be empty.");
    }

    await DAO.UpdateDAO(code, {
        name,
        description,
        questionText,
        isActive
    });
    return "Fact successful updated."
}

export const DeleteServices = async (code) => {
    if(!code) {
        throw new Error("Cannot process : code not found.");
    }

    await DAO.DeleteDAO(code);
    return "Fact successful deleted.";
}