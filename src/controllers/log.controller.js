import Log from "../models/Log";

export const createLog = async (req) => {
  const { username, id_user, token, email, device, status } = req;
  try {
    const newLog = new Log({ username, id_user, token, email, device, status });
    const logSaved = await newLog.save();
    // console.log(logSaved);
  } catch (error) {
    console.log(error);
  }
};

export const validateLogByToken = async (token) => {
  try {
    const log = await Log.findOne({ token: token });
    return {
      status: 200,
      message: " Token validate",
      result: log.status === 1,
    };
  } catch (error) {
    return { status: 400, message: "Error invalidating Token" };
  }
};

export const invalidateLogByToken = async (token) => {
  try {
    const log = await Log.findOne({ token: token });
    await Log.findByIdAndUpdate(log.id, { status: 0 });
    return { status: 200, message: " Token invalidate" };
  } catch (error) {
    return { status: 400, message: "Error invalidating Token" };
  }
};

export const invalidateLogByEmail = async (email) => {
  try {
    const log = await Log.findOne({ email: email, status: 1 });
    if (log) await Log.findByIdAndUpdate(log.id, { status: 0 });
  } catch (error) {
    console.log(error);
  }
};
