import * as Services from "./services.js";

export const FetchController = async (req, res) => {
    try {
        const result = await Services.FetchServices();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const CreateController = async (req, res) => {
    try {
        const result = await Services.CreateServices(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const UpdateController = async (req, res) => {
    try {
        const result = await Services.UpdateServices(req.params.code, req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const DeleteController = async (req, res) => {
    try {
        const result = await Services.DeleteServices(req.params.code);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}