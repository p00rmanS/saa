import type { Flashcard } from "@/lib/types";

export const storageFlashcards: Flashcard[] = [
  { id: "fc-amazon-s3-1", serviceId: "amazon-s3", domain: 3, category: "Storage", front: "What is Amazon S3?", back: "Object storage for files, accessed by API, designed for massive scale and high durability." },
  { id: "fc-amazon-s3-2", serviceId: "amazon-s3", domain: 4, category: "Storage", front: "What determines which S3 storage class to use?", back: "How often the data is accessed — frequent access vs infrequent vs archive." },
  { id: "fc-amazon-s3-3", serviceId: "amazon-s3", domain: 1, category: "Storage", front: "What lets someone temporarily access a private S3 object without making it public?", back: "A presigned URL." },
  { id: "fc-amazon-s3-4", serviceId: "amazon-s3", domain: 1, category: "Storage", front: "S3 bucket policy vs IAM policy — key difference?", back: "Bucket policy: resource-based, attached to the bucket, enables cross-account access. IAM policy: identity-based, attached to a user/role." },
  { id: "fc-amazon-s3-5", serviceId: "amazon-s3", domain: 3, category: "Storage", front: "Taglish: Ano ang S3?", back: "Parang malaking warehouse na ang bawat box (object) ay may sariling label (key) — puwede mong i-store at kunin gamit ang API." },

  { id: "fc-amazon-ebs-1", serviceId: "amazon-ebs", domain: 3, category: "Storage", front: "What is Amazon EBS?", back: "Block storage that attaches to a single EC2 instance, like a virtual hard drive." },
  { id: "fc-amazon-ebs-2", serviceId: "amazon-ebs", domain: 3, category: "Storage", front: "Is EBS AZ-scoped?", back: "Yes — an EBS volume lives in a specific AZ and attaches only to instances in that same AZ." },
  { id: "fc-amazon-ebs-3", serviceId: "amazon-ebs", domain: 1, category: "Storage", front: "What lets you back up an EBS volume?", back: "EBS snapshots, stored in S3 behind the scenes." },
  { id: "fc-amazon-ebs-4", serviceId: "amazon-ebs", domain: 3, category: "Storage", front: "EBS vs EFS — key difference?", back: "EBS: attaches to ONE instance at a time (block storage). EFS: shared POSIX file system mountable by MANY instances at once." },
  { id: "fc-amazon-ebs-5", serviceId: "amazon-ebs", domain: 3, category: "Storage", front: "Taglish: Ano ang EBS?", back: "Parang hard drive na naka-attach sa isang EC2 instance lang — kung kailangan ng shared storage sa maraming instances, EFS ang gamitin." },

  { id: "fc-amazon-efs-1", serviceId: "amazon-efs", domain: 3, category: "Storage", front: "What is Amazon EFS?", back: "A shared, elastic POSIX file system that multiple Linux EC2 instances can mount simultaneously." },
  { id: "fc-amazon-efs-2", serviceId: "amazon-efs", domain: 2, category: "Storage", front: "Is EFS multi-AZ by design?", back: "Yes — EFS is a Regional service accessible from multiple AZs, unlike single-AZ EBS." },
  { id: "fc-amazon-efs-3", serviceId: "amazon-efs", domain: 3, category: "Storage", front: "Exam keyword for EFS?", back: "\"Shared Linux file system\" across multiple EC2 instances." },
  { id: "fc-amazon-efs-4", serviceId: "amazon-efs", domain: 4, category: "Storage", front: "How does EFS capacity scale?", back: "Elastically and automatically — you don't pre-provision a fixed size like you do with EBS." },
  { id: "fc-amazon-efs-5", serviceId: "amazon-efs", domain: 3, category: "Storage", front: "Taglish: Kailan EFS ang gamitin?", back: "Kapag kailangan ng maraming EC2 instances na sabay-sabay mag-access sa parehong mga files." },

  { id: "fc-amazon-fsx-1", serviceId: "amazon-fsx", domain: 3, category: "Storage", front: "What is the FSx family for?", back: "Managed, specialized file systems (Windows File Server, Lustre, NetApp ONTAP, OpenZFS) for specific workload needs." },
  { id: "fc-amazon-fsx-2", serviceId: "amazon-fsx", domain: 3, category: "Storage", front: "When would you pick FSx over EFS?", back: "When you need a specific file system's native features — e.g. Windows SMB support (FSx for Windows) or HPC-scale throughput (FSx for Lustre)." },
  { id: "fc-amazon-fsx-3", serviceId: "amazon-fsx", domain: 3, category: "Storage", front: "Taglish: Ano ang FSx?", back: "Family ng managed file systems para sa specific na pangangailangan — gaya ng Windows file sharing o high-performance computing." },

  { id: "fc-s3-glacier-1", serviceId: "s3-glacier", domain: 4, category: "Storage", front: "What is S3 Glacier for?", back: "Long-term, low-cost archival storage for data accessed rarely." },
  { id: "fc-s3-glacier-2", serviceId: "s3-glacier", domain: 4, category: "Storage", front: "What's the trade-off across Glacier retrieval tiers?", back: "Faster retrieval = higher cost; slower retrieval (e.g. Deep Archive) = lowest cost." },
  { id: "fc-s3-glacier-3", serviceId: "s3-glacier", domain: 1, category: "Storage", front: "What automates moving data from S3 Standard to Glacier over time?", back: "S3 Lifecycle rules." },
  { id: "fc-s3-glacier-4", serviceId: "s3-glacier", domain: 1, category: "Storage", front: "What feature supports compliance/legal-hold requirements for S3 (including Glacier-class) objects?", back: "S3 Object Lock (Governance or Compliance mode), for WORM (write-once-read-many) retention." },
  { id: "fc-s3-glacier-5", serviceId: "s3-glacier", domain: 4, category: "Storage", front: "Taglish: Kailan Glacier ang gamitin?", back: "Kapag matagal nang hindi ginagamit ang data pero kailangan pa rin itong i-retain para sa compliance o backup, at gusto mong pinakamura." },

  { id: "fc-aws-storage-gateway-1", serviceId: "aws-storage-gateway", domain: 3, category: "Storage", front: "What is AWS Storage Gateway for?", back: "Hybrid cloud storage — connecting on-premises applications to AWS storage via File, Volume, or Tape gateway types." },
  { id: "fc-aws-storage-gateway-2", serviceId: "aws-storage-gateway", domain: 3, category: "Storage", front: "Which Storage Gateway type replaces a physical tape backup system?", back: "Tape Gateway." },
  { id: "fc-aws-storage-gateway-3", serviceId: "aws-storage-gateway", domain: 3, category: "Storage", front: "Taglish: Kailan gagamit ng Storage Gateway?", back: "Kapag may on-premises application ka na kailangang kumonekta o mag-backup papunta sa AWS storage, hybrid style." },

  { id: "fc-aws-backup-1", serviceId: "aws-backup", domain: 1, category: "Storage", front: "What is AWS Backup for?", back: "Centralized backup policies and management across many AWS services (EBS, RDS, DynamoDB, EFS, and more)." },
  { id: "fc-aws-backup-2", serviceId: "aws-backup", domain: 2, category: "Storage", front: "What does an AWS Backup plan define?", back: "Backup schedule, retention rules, and which resources are covered." },
  { id: "fc-aws-backup-3", serviceId: "aws-backup", domain: 2, category: "Storage", front: "Can AWS Backup replicate backups cross-Region or cross-account?", back: "Yes — for disaster recovery and compliance purposes." },
  { id: "fc-aws-backup-4", serviceId: "aws-backup", domain: 1, category: "Storage", front: "Why use AWS Backup instead of manual per-service backup scripts?", back: "One centralized policy and view across many services, instead of separate scripts/schedules per service." },
  { id: "fc-aws-backup-5", serviceId: "aws-backup", domain: 1, category: "Storage", front: "Taglish: Ano ang benepisyo ng AWS Backup?", back: "Isang lugar na lang ang pagse-set up ng backup policy para sa maraming services, hindi na kailangan ng hiwalay-hiwalay na script." },
];
