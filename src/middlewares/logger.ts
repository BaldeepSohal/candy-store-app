function log(data: any, next: () => void)  {
    console.log('Logging...', data);
    next();
}


export default log;