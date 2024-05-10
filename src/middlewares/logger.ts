function log(req: any, res: any, next: () => void)  {
    console.log('Logging...');
    next();
}


export default log;