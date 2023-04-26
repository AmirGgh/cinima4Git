export const validPermission = (per, currPermissions) => {
    return currPermissions?.includes(per)
}