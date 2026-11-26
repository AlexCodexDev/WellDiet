import *  as DAO from "./dao.js";

export const FetchServices = async () => {
    const data = await DAO.FetchDAO();

    if(!data) throw new Error("Failed to fetch data.");

    return data;
}

export const CreateServices = async (data) => {
    const { name, description } = data;

    if(!name) {
        throw new Error("Category name cannot be empty.");
    }

    await DAO.CreateDAO({name, description});
    return "Category successful created.";
}

export const UpdateServices = async (code, data) => {
    const { name, description, activeStatus } = data;
    let status = true;

    if(!code) {
        throw new Error("Category code not found.");
    }

    if(!name) {
        throw new Error("Category name cannot be empty.");
    }

    if(!activeStatus) {
        throw new Error("Status cannot be empty.");
    }

    if(activeStatus == "active") {
        status = true;
    } else {
        status = false;
    }

    await DAO.UpdateDAO(code, { name, description, status });
    return "Category successful updated.";
}

export const DeleteServices = async (code) => {
    if(!code) {
        throw new Error("Cannot process : code not found.");
    }

    await DAO.DeleteDAO(code);
    return "Category successful deleted.";
}