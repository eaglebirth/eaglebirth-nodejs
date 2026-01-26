import { BaseResource } from './base';

export interface CreateDirectoryParams {
  path: string;
  private?: 'yes' | 'no';
  directoryPassword?: string;
}

export interface DeleteDirectoryParams {
  directoryId?: string;
  path?: string;
}

export interface ListDirectoryParams {
  path?: string;
  directoryId?: string;
  token?: string;
  directoryPassword?: string;
}

export interface UpdateDirectoryPasswordParams {
  directoryPassword: string;
  directoryId?: string;
  path?: string;
}

export interface UpdateDirectoryPrivacyParams {
  isPrivate: 'yes' | 'no';
  directoryId?: string;
  path?: string;
}

export interface UploadFileParams {
  file: string | Buffer;
  path: string;
  filename?: string;
  private?: 'yes' | 'no';
  directoryPassword?: string;
  filePassword?: string;
}

export interface RetrieveFileParams {
  fileId?: string;
  path?: string;
  token?: string;
  password?: string;
}

export interface DeleteFileParams {
  fileId?: string;
  path?: string;
  token?: string;
}

export interface UpdateFilePasswordParams {
  password: string;
  fileId?: string;
  path?: string;
}

export interface UpdateFilePrivacyParams {
  private: 'yes' | 'no';
  fileId?: string;
  path?: string;
  refreshToken?: 'yes' | 'no';
}

/**
 * Directory management resource
 */
export class DirectoryResource extends BaseResource {
  async create(params: CreateDirectoryParams): Promise<any> {
    const data: Record<string, any> = {
      path: params.path,
      private: params.private || 'no',
    };
    if (params.directoryPassword) data.directory_password = params.directoryPassword;

    return this.client.makeRequest('POST', '/app/storage/directory/', data);
  }

  async delete(params: DeleteDirectoryParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.directoryId) data.directory_id = params.directoryId;
    if (params.path) data.path = params.path;

    return this.client.makeRequest('POST', '/app/storage/directory/delete_a_directory/', data);
  }

  async listContent(params: ListDirectoryParams): Promise<any> {
    if (params.path) {
      const data: Record<string, any> = { path: params.path };
      if (params.token) data.token = params.token;
      if (params.directoryPassword) data.directory_password = params.directoryPassword;
      return this.client.makeRequest('POST', '/app/storage/directory/list_directory_content/', data);
    } else if (params.directoryId) {
      const data: Record<string, any> = { directory_id: params.directoryId };
      if (params.token) data.token = params.token;
      if (params.directoryPassword) data.directory_password = params.directoryPassword;
      return this.client.makeRequest('POST', '/app/storage/directory/list_directory_content_from_id/', data);
    } else {
      throw new Error('Either path or directoryId must be provided');
    }
  }

  async updatePassword(params: UpdateDirectoryPasswordParams): Promise<any> {
    const data: Record<string, any> = { directory_password: params.directoryPassword };
    if (params.directoryId) data.directory_id = params.directoryId;
    if (params.path) data.path = params.path;

    return this.client.makeRequest('POST', '/app/storage/directory/update_directory_password/', data);
  }

  async updatePrivacy(params: UpdateDirectoryPrivacyParams): Promise<any> {
    const data: Record<string, any> = { is_private: params.isPrivate };
    if (params.directoryId) data.directory_id = params.directoryId;
    if (params.path) data.path = params.path;

    return this.client.makeRequest('POST', '/app/storage/directory/update_directory_privacy/', data);
  }
}

/**
 * File management resource
 */
export class FileResource extends BaseResource {
  async upload(params: UploadFileParams): Promise<any> {
    const data: Record<string, any> = {
      path: params.path,
      private: params.private || 'no',
    };
    if (params.filename) data.filename = params.filename;
    if (params.directoryPassword) data.directory_password = params.directoryPassword;
    if (params.filePassword) data.file_password = params.filePassword;

    const files: Record<string, string | Buffer> = { file: params.file };

    return this.client.makeRequest('POST', '/app/storage/file/', data, files);
  }

  async retrieve(params: RetrieveFileParams): Promise<any> {
    if (params.fileId) {
      const data: Record<string, any> = { id: params.fileId };
      if (params.token) data.token = params.token;
      if (params.password) data.password = params.password;
      return this.client.makeRequest('POST', '/app/storage/file/content_from_id/', data);
    } else if (params.path) {
      const queryParams: Record<string, any> = { path: params.path };
      if (params.token) queryParams.token = params.token;
      if (params.password) queryParams.password = params.password;
      return this.client.makeRequest('GET', '/app/storage/file/content/', queryParams);
    } else {
      throw new Error('Either fileId or path must be provided');
    }
  }

  async delete(params: DeleteFileParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.fileId) data.file_id = params.fileId;
    if (params.path) data.path = params.path;
    if (params.token) data.token = params.token;

    return this.client.makeRequest('POST', '/app/storage/file/delete_a_file/', data);
  }

  async updatePassword(params: UpdateFilePasswordParams): Promise<any> {
    const data: Record<string, any> = { password: params.password };
    if (params.fileId) data.file_id = params.fileId;
    if (params.path) data.path = params.path;

    return this.client.makeRequest('POST', '/app/storage/file/update_file_password/', data);
  }

  async updatePrivacy(params: UpdateFilePrivacyParams): Promise<any> {
    const data: Record<string, any> = {
      private: params.private,
      refresh_token: params.refreshToken || 'no',
    };
    if (params.fileId) data.file_id = params.fileId;
    if (params.path) data.path = params.path;

    return this.client.makeRequest('POST', '/app/storage/file/update_file_privacy/', data);
  }
}

/**
 * Cloud Storage resource for managing files and directories
 */
export class StorageResource extends BaseResource {
  public readonly directory: DirectoryResource;
  public readonly file: FileResource;

  constructor(client: any) {
    super(client);
    this.directory = new DirectoryResource(client);
    this.file = new FileResource(client);
  }
}
