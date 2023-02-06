import {IQueue, Queue, QueueEncryption} from "aws-cdk-lib/aws-sqs";
import {config} from "../config/configuration";
import {Stack} from "aws-cdk-lib";


interface QueueProps {
    id: string;
}

export class GenericQueue {
    private readonly stack: Stack;
    private props: QueueProps;
    private queue: IQueue;

    public constructor(stack: Stack, props: QueueProps) {
        this.stack = stack;
        this.props = props;
        this.initialize();
    }

    private initialize() {
        this.queue = new Queue(this.stack, this.props.id, {
            queueName: `${config.environmentKey}-${this.props.id}-queue`,
            encryption: QueueEncryption.UNENCRYPTED

        });
    }

    getQueue() {
        return this.queue;
    }
}
