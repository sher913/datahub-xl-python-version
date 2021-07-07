import React from 'react';
import { render } from '@testing-library/react';
import { EntityType, PlatformNativeType, SearchResult } from '../../../../types.generated';
import TestPageContainer from '../../../../utils/test-utils/TestPageContainer';
import RelatedEntity from '../RelatedEntity';

const searchResult: {
    [key in EntityType]?: Array<SearchResult>;
} = {
    [EntityType.Dataset]: [
        {
            entity: {
                urn: 'some:urn1',
                type: EntityType.Dataset,
                name: 'HiveDataset',
                origin: 'PROD',
                description: 'this is a dataset',
                platformNativeType: PlatformNativeType.Table,
                platform: {
                    name: 'hive',
                },
                tags: [],
            },
            matchedFields: [],
        } as SearchResult,
        {
            entity: {
                urn: 'some:urn2',
                type: EntityType.Dataset,
                name: 'KafkaDataset',
                origin: 'PROD',
                description: 'this is also a dataset',
                platformNativeType: PlatformNativeType.Table,
                platform: {
                    name: 'kafka',
                },
                tags: [],
            },
            matchedFields: [],
        } as SearchResult,
    ],
};

describe('RelatedEntity', () => {
    it('renders the entity rows', () => {
        const { getByText } = render(
            <TestPageContainer>
                <RelatedEntity searchResult={searchResult} entityPath="dataset" />
            </TestPageContainer>,
        );
        expect(getByText('this is a dataset')).toBeInTheDocument();
        expect(getByText('this is also a dataset')).toBeInTheDocument();
    });
});
