import AccessEnum from "@/access/accessEnum";

/**
 * 定义一个公用的权限校验方法
 */
const checkAccess = (loginUser: any, needAccess: any) => {
  const loginUserAccess = loginUser?.userRole ?? AccessEnum.NOT_LOGIN;
  if (needAccess === undefined) return true;
  if (needAccess === AccessEnum.NOT_LOGIN) return true;
  if (needAccess === AccessEnum.USER) {
    if (loginUserAccess === AccessEnum.NOT_LOGIN) return false;
    return true;
  }
  if (needAccess === AccessEnum.ADMIN) {
    if (loginUserAccess !== AccessEnum.ADMIN) return false;
    return true;
  }
};

export default checkAccess;
