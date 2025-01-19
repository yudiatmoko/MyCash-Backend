import { PrismaClient } from "@prisma/client";

class SessionModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  addSession = async (session) => {
    const newSession = await this.prisma.session.create({ data: session });
    return newSession;
  };

  getAllSessions = async () => {
    const sessions = await this.prisma.session.findMany();
    return sessions;
  };

  getSessionsByOutlet = async (outletId) => {
    const session = await this.prisma.session.findMany({
      where: { outletId },
    });
    return session;
  };

  getSessionById = async (id) => {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });
    return session;
  };

  updateSession = async (id, session) => {
    const updatedSession = await this.prisma.session.update({
      where: { id },
      data: session,
    });
    return updatedSession;
  };

  deleteSession = async (id) => {
    const deletedSession = await this.prisma.session.delete({
      where: { id },
    });
    return deletedSession;
  };
}

export default new SessionModel();
