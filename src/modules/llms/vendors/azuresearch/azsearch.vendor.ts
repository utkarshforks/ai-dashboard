import { VChatMessageIn, VChatMessageOut, VChatMessageOrFunctionCallOut } from "../../llm.client";
import { OpenAIAccessSchema } from "../../server/openai/openai.router";
import { OpenAIWire } from "../../server/openai/openai.wiretypes";
import { DModelInterfaceV1 } from "../../store-llms";
import { IModelVendor } from "../IModelVendor";
import { OpenAILLMOptions } from "../openai/OpenAILLMOptions";
import { SourceSetupOpenAI, LLMOptionsOpenAI, ModelVendorOpenAI } from "../openai/openai.vendor";
import { AzureSearchSourceSetup } from "./AzureSearchSourceSetup";
import { AzureIcon } from '~/common/components/icons/vendors/AzureIcon';

export interface SourceSetupAzureSearch {
    azureSearchEndpoint: string;
    azureSearchKey: string;
  }

  export const isValidAzureApiKey = (apiKey?: string) => !!apiKey && apiKey.length >= 32;


export const ModelVendorAzureSearch: IModelVendor<SourceSetupAzureSearch, OpenAIAccessSchema, LLMOptionsOpenAI> = {
    id: 'azsearch',
    name: 'Azure Search',
    rank: 10,
    location: 'cloud',
    instanceLimit: 5,
    hasBackendCapKey: 'hasLlmOpenAI',
    Icon: AzureIcon,
    SourceSetupComponent: AzureSearchSourceSetup,
    LLMOptionsComponent: OpenAILLMOptions,
  // functions
  getTransportAccess: (partialSetup): OpenAIAccessSchema => ({
    dialect: 'azure',
    oaiKey: partialSetup?.azureSearchKey || '',
    oaiOrg: '',
    oaiHost: partialSetup?.azureSearchEndpoint || '',
    heliKey: '',
    moderationCheck: false,
  }),

  // OpenAI transport ('azure' dialect in 'access')
  rpcUpdateModelsOrThrow: ModelVendorOpenAI.rpcUpdateModelsOrThrow,
  rpcChatGenerateOrThrow: ModelVendorOpenAI.rpcChatGenerateOrThrow,
  streamingChatGenerateOrThrow: ModelVendorOpenAI.streamingChatGenerateOrThrow,
}