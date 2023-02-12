import {Stack} from "aws-cdk-lib";
import {
    AttributeType,
    BillingMode,
    StreamViewType,
    Table,
} from "aws-cdk-lib/aws-dynamodb";
import {config} from "../config/configuration";

export interface TableProps {
    tableName: string;
    primaryKey: string;
    secondaryIndexes?: string[];
    sortKey?: string;
}

export class GenericTable {
    private readonly stack: Stack;
    private table: Table;
    private props: TableProps;

    public constructor(stack: Stack, props: TableProps) {
        this.stack = stack;
        this.props = props;
        this.initialize();
    }

    private initialize() {
        this.createTable();
    }

    private createTable() {

        this.table = new Table(this.stack, `${config.environmentKey}-companies`, {
            tableName: config.dynamoDbTableName,
            partitionKey: {name: "PK", type: AttributeType.STRING},
            sortKey: {name: "SK", type: AttributeType.STRING},
            billingMode: BillingMode.PAY_PER_REQUEST,
        });

        // this.table.addGlobalSecondaryIndex({
        //     indexName: "CompanyIndex",
        //     partitionKey: {name: "CompanyId", type: AttributeType.STRING},
        //     sortKey: {name: "CompanyName", type: AttributeType.STRING},
        // });

        this.table.addGlobalSecondaryIndex({
            indexName: "DepartmentIndex",
            partitionKey: {
                name: "DepartmentId",
                type: AttributeType.STRING,
            },
            sortKey: {name: "DepartmentName", type: AttributeType.STRING},
        });

        this.table.addGlobalSecondaryIndex({
            indexName: "OfficeIndex",
            partitionKey: {name: "OfficeId", type: AttributeType.STRING},
            sortKey: {name: "OfficeName", type: AttributeType.STRING},
        });

        this.table.addGlobalSecondaryIndex({
            indexName: "EmployeeIndex",
            partitionKey: {name: "EmployeeId", type: AttributeType.STRING},
            sortKey: {name: "EmployeeName", type: AttributeType.STRING},
        });
    }

    private addSecondaryIndexes() {
        if (this.props.secondaryIndexes) {
            for (const secondaryIndex of this.props.secondaryIndexes) {
                this.table.addGlobalSecondaryIndex({
                    indexName: secondaryIndex,
                    partitionKey: {
                        name: secondaryIndex,
                        type: AttributeType.STRING,
                    },
                });
            }
        }
    }
}
