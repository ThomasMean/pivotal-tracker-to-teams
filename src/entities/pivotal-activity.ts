export interface PrimaryResource {
    story_type: string;
    name: string;
    url: string;
    id: number;
    kind: string;
}

export interface NewValues {
    accepted_at: number;
    before_id: number;
    after_id: number;
    current_state: string;
    updated_at: number;
}

export interface OriginalValues {
    accepted_at?: any;
    before_id: number;
    after_id: number;
    current_state: string;
    updated_at: number;
}

export interface Change {
    story_type: string;
    name: string;
    new_values: NewValues;
    original_values: OriginalValues;
    id: number;
    change_type: string;
    kind: string;
}

export interface PerformedBy {
    name: string;
    initials: string;
    id: number;
    kind: string;
}

export interface Project {
    name: string;
    id: number;
    kind: string;
}

export interface PivotalActivity {
    occurred_at: number;
    highlight: string;
    primary_resources: PrimaryResource[];
    changes: Change[];
    message: string;
    project_version: number;
    performed_by: PerformedBy;
    guid: string;
    project: Project;
    kind: string;
}

export default PivotalActivity;


