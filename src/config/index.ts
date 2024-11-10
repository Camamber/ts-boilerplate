import cnfg from 'cnfg';

export default cnfg(__dirname);
export const env = process.env.NODE_ENV || 'development';
