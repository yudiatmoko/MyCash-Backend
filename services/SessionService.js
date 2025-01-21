import SessionModel from "../models/SessionModel.js";
import UserService from "./UserService.js";
import OutletService from "./OutletService.js";

class SessionService {
  async addSession(date, shift, startingCash, userId, outletId) {
    await UserService.getUserById(userId);
    await OutletService.getOutletById(outletId);
    let formattedDate;
    if (date) {
      formattedDate = new Date(date).toISOString();
    }
    const session = {
      date: formattedDate,
      shift,
      startingCash,
      userId,
      outletId,
    };
    const newSession = await SessionModel.addSession(session);
    return newSession;
  }

  async getAllSessions() {
    const sessions = await SessionModel.getAllSessions();
    if (sessions.length === 0) {
      throw new Error("No sessions found");
    }
    return sessions;
  }

  async getSessionById(id) {
    const session = await SessionModel.getSessionById(id);
    if (!session) {
      throw new Error("Session not found");
    }
    return session;
  }

  async getSessionsByOutlet(outletId) {
    await OutletService.getOutletById(outletId);
    const sessions = await SessionModel.getSessionsByOutlet(outletId);
    if (sessions.length === 0) {
      throw new Error("No sessions found for the outlet");
    }
    return sessions;
  }

  async updateSession(
    id,
    date,
    shift,
    startingCash,
    totalRevenue,
    checkOutTime
  ) {
    const exsistingSession = await this.getSessionById(id);
    let formattedDate;
    if (date) {
      formattedDate = new Date(date).toISOString();
    }
    let formattedCheckOutTime;
    if (checkOutTime) {
      formattedCheckOutTime = new Date();
    }
    const session = {
      date: formattedDate || exsistingSession.date,
      shift: shift || exsistingSession.shift,
      startingCash: startingCash || exsistingSession.startingCash,
      totalRevenue: totalRevenue || exsistingSession.totalRevenue,
      checkOutTime: formattedCheckOutTime || exsistingSession.checkOutTime,
    };
    const updatedSession = await SessionModel.updateSession(id, session);
    return updatedSession;
  }

  async updateRevenue(id, amount) {
    const exsistingSession = await this.getSessionById(id);
    const totalRevenue = {
      totalRevenue: exsistingSession.totalRevenue + amount,
    };
    const updateSession = await SessionModel.updateSession(id, totalRevenue);
    return updateSession;
  }

  async deleteSession(id) {
    await this.getSessionById(id);
    const deletedSession = await SessionModel.deleteSession(id);
    return deletedSession;
  }
}

export default new SessionService();
