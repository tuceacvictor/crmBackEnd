exports.paginate = ({page, pageSize}) => {
    const isPaginate = page === undefined;
    console.log(isPaginate, page, pageSize);
    const offset = isPaginate ? parseInt(page) * parseInt(pageSize) : 0;
    const limit = isPaginate ? parseInt(pageSize) : 100000;
    return {
        offset,
        limit,
    };
};