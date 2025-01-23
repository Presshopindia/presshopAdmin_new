import { Post } from "api/admin.services";

export const getFilePath = (url) => {
    const separaeteUrl = url?.split("/");
    const newUrl = "public/" + separaeteUrl[separaeteUrl?.length - 2] + "/" + separaeteUrl[separaeteUrl?.length - 1];
    return newUrl;
}

export const deleteCSV = async (path) => {
    try {
        setTimeout(async () => {
            await Post(`admin/deleteCsv`, { path: getFilePath(path) });
        }, 3000);
    } catch (error) {
        console.log(error);
    }
};

export const findCountOfContent = (arr, type) => {
    const result = arr?.reduce((count, item) => item?.type === type ? count + 1 : count, 0);
    return result;
}

export const hasDecimal = (value) => {
    return value % 1 !== 0;
}


export const getFilenameFromUrl = (url) => {
    const index = url.indexOf('adminImages/');
    if (index !== -1) {
        return url.substring(index + 'adminImages/'.length);
    } else {
        return null;
    }
};

export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}
// Receive last 2 digits-
export const receiveLastTwoDigits = (number) => {
    return (+(number)%1)?.toFixed(2)?.toString()?.replace(/^0/, '') > 0 ? (+(number)%1)?.toFixed(2)?.toString()?.replace(/^0/, '') : ""
}

export const formatAmountInMillion = (amount) => {
    return (Math.floor(amount)?.toLocaleString("en-US", {
        maximumFractionDigits: 0,
    }) + receiveLastTwoDigits(amount) || "")
};