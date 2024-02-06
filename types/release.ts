export type Assets = {
    name: string;
    brand: string;
    fileName: string;
    version: string;
    arch: string;
    browser_download_url: string;
}

export type Release = {
    tag_name: string;
    assets: Assets[];
    published_at: string;
    html_url: string;
    body: string;
    prerelease: boolean;
    draft: boolean;
    name: string;
    url: string;
    assets_url: string;
    upload_url: string;
    tarball_url: string;
    zipball_url: string;
    id: number;
    node_id: string;
};

type githubAsset = {
    name: string;
    browser_download_url: string;
};

export type PreVancedUpdate = Exclude<PreVancedUpdateType, "assets"> & {
    assets: githubAsset[];
};

export type PreVancedUpdateType = {
    version: string;
    release: Release;
    isUpdateAvailable: boolean;
    arch: string;
};